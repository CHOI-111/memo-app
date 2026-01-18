const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'your-secret-key-change-in-production'; // 프로덕션에서는 환경변수로 관리하세요

// 미들웨어
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..')));

// 데이터베이스 초기화
const dbPath = path.join(__dirname, 'memoapp.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('데이터베이스 연결 오류:', err.message);
    } else {
        console.log('SQLite 데이터베이스에 연결되었습니다:', dbPath);
        initDatabase();
    }
});

// 데이터베이스 테이블 생성
function initDatabase() {
    db.serialize(() => {
        // 사용자 테이블
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // 메모 테이블
        db.run(`CREATE TABLE IF NOT EXISTS memos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            title TEXT,
            content TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`);
    });
}

// JWT 인증 미들웨어
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: '인증 토큰이 필요합니다.' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: '유효하지 않은 토큰입니다.' });
        }
        req.user = user;
        next();
    });
}

// 회원가입
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    console.log('회원가입 요청:', { username, email, password: '***' });

    if (!username || !email || !password) {
        return res.status(400).json({ error: '모든 필드를 입력해주세요.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: '비밀번호는 최소 6자 이상이어야 합니다.' });
    }

    try {
        // 중복 확인
        db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], async (err, row) => {
            if (err) {
                console.error('데이터베이스 조회 오류:', err);
                return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
            }

            if (row) {
                return res.status(400).json({ error: '이미 사용 중인 사용자명 또는 이메일입니다.' });
            }

            // 비밀번호 해시화
            const hashedPassword = await bcrypt.hash(password, 10);

            // 사용자 생성
            db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', 
                [username, email, hashedPassword], 
                function(err) {
                    if (err) {
                        console.error('사용자 생성 오류:', err);
                        return res.status(500).json({ error: '회원가입 중 오류가 발생했습니다: ' + err.message });
                    }

                    console.log('사용자 생성 성공:', this.lastID);

                    // JWT 토큰 생성
                    const token = jwt.sign(
                        { id: this.lastID, username, email },
                        JWT_SECRET,
                        { expiresIn: '7d' }
                    );

                    res.status(201).json({
                        message: '회원가입이 완료되었습니다.',
                        token,
                        user: { id: this.lastID, username, email }
                    });
                }
            );
        });
    } catch (error) {
        console.error('회원가입 오류:', error);
        res.status(500).json({ error: '서버 오류가 발생했습니다: ' + error.message });
    }
});

// 로그인
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    console.log('로그인 요청:', { username, password: '***' });

    if (!username || !password) {
        return res.status(400).json({ error: '사용자명과 비밀번호를 입력해주세요.' });
    }

    db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, username], async (err, user) => {
        if (err) {
            console.error('데이터베이스 조회 오류:', err);
            return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
        }

        if (!user) {
            console.log('사용자를 찾을 수 없음:', username);
            return res.status(401).json({ error: '사용자명 또는 비밀번호가 올바르지 않습니다.' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            console.log('비밀번호 불일치');
            return res.status(401).json({ error: '사용자명 또는 비밀번호가 올바르지 않습니다.' });
        }

        console.log('로그인 성공:', user.username);

        // JWT 토큰 생성
        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: '로그인 성공',
            token,
            user: { id: user.id, username: user.username, email: user.email }
        });
    });
});

// 로그아웃 (클라이언트에서 토큰 삭제하므로 서버에서는 성공만 반환)
app.post('/api/logout', authenticateToken, (req, res) => {
    res.json({ message: '로그아웃되었습니다.' });
});

// 현재 사용자 정보 조회
app.get('/api/me', authenticateToken, (req, res) => {
    res.json({ user: req.user });
});

// 메모 목록 조회
app.get('/api/memos', authenticateToken, (req, res) => {
    db.all('SELECT * FROM memos WHERE user_id = ? ORDER BY updated_at DESC', [req.user.id], (err, memos) => {
        if (err) {
            return res.status(500).json({ error: '메모를 불러오는 중 오류가 발생했습니다.' });
        }
        res.json(memos);
    });
});

// 메모 생성
app.post('/api/memos', authenticateToken, (req, res) => {
    const { title, content } = req.body;
    
    db.run('INSERT INTO memos (user_id, title, content) VALUES (?, ?, ?)', 
        [req.user.id, title || '', content || ''], 
        function(err) {
            if (err) {
                return res.status(500).json({ error: '메모를 생성하는 중 오류가 발생했습니다.' });
            }
            
            db.get('SELECT * FROM memos WHERE id = ?', [this.lastID], (err, memo) => {
                if (err) {
                    return res.status(500).json({ error: '메모를 불러오는 중 오류가 발생했습니다.' });
                }
                res.status(201).json(memo);
            });
        }
    );
});

// 메모 수정
app.put('/api/memos/:id', authenticateToken, (req, res) => {
    const { title, content } = req.body;
    const memoId = req.params.id;

    db.run('UPDATE memos SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
        [title || '', content || '', memoId, req.user.id],
        function(err) {
            if (err) {
                return res.status(500).json({ error: '메모를 수정하는 중 오류가 발생했습니다.' });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: '메모를 찾을 수 없습니다.' });
            }

            db.get('SELECT * FROM memos WHERE id = ?', [memoId], (err, memo) => {
                if (err) {
                    return res.status(500).json({ error: '메모를 불러오는 중 오류가 발생했습니다.' });
                }
                res.json(memo);
            });
        }
    );
});

// 메모 삭제
app.delete('/api/memos/:id', authenticateToken, (req, res) => {
    const memoId = req.params.id;

    db.run('DELETE FROM memos WHERE id = ? AND user_id = ?', [memoId, req.user.id], function(err) {
        if (err) {
            return res.status(500).json({ error: '메모를 삭제하는 중 오류가 발생했습니다.' });
        }

        if (this.changes === 0) {
            return res.status(404).json({ error: '메모를 찾을 수 없습니다.' });
        }

        res.json({ message: '메모가 삭제되었습니다.' });
    });
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

// 프로세스 종료 시 데이터베이스 연결 종료
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('데이터베이스 연결이 종료되었습니다.');
        process.exit(0);
    });
});

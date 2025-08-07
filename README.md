

## 🚀 Cách chạy dự án

```bash
# Di chuyển vào thư mục dự án
cd AIC25-MTriet

# Cài đặt dependencies (nếu chưa cài)
npm install

# Chạy development server
npm run dev
```

Mở http://localhost:5173 để xem ứng dụng.

## 📁 Cấu trúc dự án

```
src/
├── components/          # Các component tái sử dụng
│   ├── Header.tsx      # Header của website
│   └── Footer.tsx      # Footer của website
├── pages/              # Các trang chính
│   └── HomePage.tsx    # Trang chủ
├── contexts/           # React Context cho state management
│   └── AppContext.tsx  # Context chính của app
├── hooks/              # Custom hooks
│   └── index.ts        # useLocalStorage, useDebounce
├── types/              # TypeScript type definitions
│   └── index.ts        # Competition, Team, Player, Match, User types
├── utils/              # Utility functions
│   └── index.ts        # formatDate, generateId, etc.
└── App.tsx            # Component chính
```

## 🛠️ Nơi bạn cần code

### 1. **Components** (`src/components/`)
- Tạo thêm các component như:
  - `CompetitionCard.tsx` - Hiển thị thông tin giải đấu
  - `TeamCard.tsx` - Hiển thị thông tin đội bóng
  - `MatchCard.tsx` - Hiển thị thông tin trận đấu
  - `PlayerList.tsx` - Danh sách cầu thủ
  - `ScoreBoard.tsx` - Bảng điểm

### 2. **Pages** (`src/pages/`)
- Tạo các trang chính:
  - `CompetitionsPage.tsx` - Trang danh sách giải đấu
  - `TeamsPage.tsx` - Trang quản lý đội bóng
  - `MatchesPage.tsx` - Trang lịch thi đấu
  - `LoginPage.tsx` - Trang đăng nhập
  - `DashboardPage.tsx` - Trang dashboard admin

### 3. **Types** (`src/types/index.ts`)
- Đã có sẵn các type cơ bản: Competition, Team, Player, Match, User
- Bạn có thể thêm các type khác theo nhu cầu

### 4. **Contexts** (`src/contexts/AppContext.tsx`)
- Đã có sẵn state management cơ bản
- Bạn có thể thêm các function để CRUD data

### 5. **Hooks** (`src/hooks/index.ts`)
- Đã có `useLocalStorage` và `useDebounce`
- Bạn có thể thêm custom hooks khác như `useAPI`, `useAuth`

### 6. **Utils** (`src/utils/index.ts`)
- Đã có một số utility functions
- Bạn có thể thêm các function khác như API calls, validation

Dự án đã được cấu hình Tailwind CSS. 

## 📦 Scripts có sẵn

- `npm run dev` - Chạy development server
- `npm run build` - Build production
- `npm run preview` - Preview production build
- `npm run lint` - Chạy ESLint

## 🔧 Cấu hình

- **Vite**: `vite.config.ts`
- **TypeScript**: `tsconfig.json`
- **Tailwind**: `tailwind.config.js`
- **PostCSS**: `postcss.config.js`



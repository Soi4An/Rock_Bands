import { Navigate, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { HomePage } from './pages/HomePage/HomePage';
import { Missing } from './pages/Missing/Missing';
import { BandsPage } from './pages/BandsPage/BandsPage';
import { Auth } from './pages/Auth/Auth';
import { GenresPage } from './pages/GenresPage/GenresPage';
import { RequireAuth } from './components/RequireAuth';
import { GenreDetails } from './pages/GenreDetails/GenreDetails';

function App() {
  return (
    <div className="App" >
      <Routes>
        <Route path="/">
          {/* <Route index element={<GenreDetails />} /> */}
          <Route index element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="auth" element={<Auth />} />

          {/* <Route element={<RequireAuth />}> */}
            <Route path="bands" element={<BandsPage />} />
            <Route path="tickets" element={<GenresPage />} />
            
            <Route path="genres">
              <Route index element={<GenresPage />} />
              <Route
                path=":genreId"
                element={<GenreDetails />}
              />
            </Route>
          {/* </Route> */}

          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

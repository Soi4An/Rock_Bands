import { Navigate, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { HomePage } from './pages/HomePage/HomePage';
import { Missing } from './pages/Missing';
import { BandsPage } from './pages/BandsPage';
import { Auth } from './pages/Auth';
import { GenresPage } from './pages/GenresPage';
import { GenreDetails } from './pages/GenreDetails';
import BandDetails from './pages/BandDetails';
import MyPage from './pages/MyPage';

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

            <Route path="bands">
              <Route index element={<BandsPage />} />
              <Route
                path=":bandId"
                element={<BandDetails />}
              />
            </Route>

            <Route path="me">
              <Route index element={<MyPage />} />
              {/* <Route
                path=":tab"
                element={<BandDetails />}
              /> */}
            </Route>
          {/* </Route> */}

          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

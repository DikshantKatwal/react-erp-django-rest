import React from 'react'
import '../public/assets/css/global.scss';
import '../public/assets/css/thestyles.scss';
import '../public/assets/css/responsive.scss'
import '../public/assets/css/bowercomponent/flaticon.css'
import { routes } from './routes/routes';


import { RouterProvider, createHashRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Notifications from './components/includes/Notifications';

const router = createHashRouter(routes)

function App() {
  const { isLoading } = useSelector((state: RootState) => state.loaderSlice)

  return (
    <>
      <div className="common-overlay"> </div>
      {isLoading > 0 && 'Loading'}
      <React.Suspense fallback='Loading'>
        <RouterProvider router={router} />
        <Notifications />
      </React.Suspense>
    </>
  )
}

export default App

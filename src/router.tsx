import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom'

import LandingPage from "pages/LandingPage"
import NewsPage from "pages/NewsPage"
import FinancingPage from 'pages/FinancingPage'
import InvestingPage from 'pages/InvestingPage'
import ErrorPage from 'pages/ErrorPage'
import LoginPage from 'pages/login/LoginPage'
import NotFound from 'pages/NotFound'
import BasePageWrapper from "pages/BasePageWrapper"
import AuthorizedPageWrapper from "pages/AuthorizedPageWrapper"

export const router = createBrowserRouter(
    [
        {
            element: <BasePageWrapper />,
            errorElement: <ErrorPage />,
            children:
                [
                      {
                          path: 'login',
                          element: <LoginPage />,
                      },
                      {
                          path: '/',
                          element: <AuthorizedPageWrapper />,
                          children: [
                              {
                                  index: true,
                                  element: <LandingPage />,
                              },
                              {
                                  path: 'news',
                                  element: <NewsPage />
                              },
                              {
                                  path: 'financing',
                                  element: <FinancingPage />
                              },
                              {
                                  path: 'investing',
                                  element: <InvestingPage />
                              },
                            ],
                      },
                      {
                          path: '*',
                          element: <NotFound redirect="/" />,
                      },
                  ],
        },
    ],
    {
        basename: '',
    }
)

export default router


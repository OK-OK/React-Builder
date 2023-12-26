import { ConfigProvider, message, Spin } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/locale/zh_CN'
import { Suspense } from 'react'
import BasicLayout from '@/modules/Layout'
import { Navigate, useLocation } from 'react-router-dom'

dayjs.locale('zh-cn')
message.config({
  maxCount: 1,
})

function App() {
  const { pathname } = useLocation()
  if (pathname === '/') {
    return <Navigate to="/test" />
  }

  return (
    <ConfigProvider locale={zhCN}>
      <Suspense fallback={<Spin size="large" className="global_spin" />}>
        <BasicLayout />
      </Suspense>
    </ConfigProvider>
  )
}

export default App

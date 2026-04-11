import { Outlet, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* 顶部导航栏 */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">W</div>
                        <h1 className="text-xl font-bold text-slate-800">名人堂百科</h1>
                    </div>

                    <nav className="space-x-2">
                        {/* asChild 属性是 shadcn 按钮的特色，允许我们将 Link 变成按钮样式 */}
                        <Button variant="ghost" asChild>
                            <Link to="/">首页检索</Link>
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link to="/profile">我的履历</Link>
                        </Button>
                        <Button>登录</Button>
                    </nav>
                </div>
            </header>

            {/* 页面主要内容区，Outlet 会根据当前路由自动渲染对应的页面组件 */}
            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>
        </div>
    )
}
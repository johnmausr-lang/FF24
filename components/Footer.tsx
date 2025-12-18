export default function Footer() {
  return (
    <footer className="border-t border-slate-100 py-10">
      <div className="container flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="font-semibold">FF24</div>
          <div className="text-sm text-slate-600">
            Фулфилмент для маркетплейсов: приемка, хранение, упаковка, логистика.
          </div>
        </div>

        <div className="text-sm text-slate-600">
          © {new Date().getFullYear()} FF24. Все права защищены.
        </div>
      </div>
    </footer>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="scroll-smooth" style={{ backgroundColor: '#000000' }}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // html тег доступен всегда
                document.documentElement.style.backgroundColor = '#000000';
                document.documentElement.style.setProperty('--background', '240 10% 3.9%');
                document.documentElement.style.setProperty('--accent-DEFAULT', '217 91% 60%');
                
                // Чтобы не упасть, проверяем body, если его нет — установим фон позже
                if (document.body) {
                   document.body.style.backgroundColor = '#000000';
                }
              })();
            `,
          }}
        />
      </head>
      {/* Принудительно ставим стиль прямо на тег body */}
      <body 
        className={`${inter.className} bg-black text-white antialiased`}
        style={{ backgroundColor: '#000000' }}
      >
        {children}
      </body>
    </html>
  );
}

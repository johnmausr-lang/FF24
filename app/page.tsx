import HomeContainer from "@/components/HomeContainer";

// Серверный компонент страницы
export default function Home() {
  return (
    // Просто отдаем управление клиентскому контейнеру
    <HomeContainer />
  );
}

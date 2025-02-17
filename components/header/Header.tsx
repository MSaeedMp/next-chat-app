import Container from "../global/Container";
import ModelSelector from "./ModelSelector";
import ResetChatButton from "./ResetChatButton";
import ThemeToggleButton from "./ThemeToggleButton";

const Header = () => {
  return (
    <header className="w-full fixed top-0 left-0 flex justify-center items-center h-14 bg-background z-50">
      <Container className="flex items-center justify-between h-full">
        <ModelSelector />
        <div className="flex items-center gap-4">
            <ResetChatButton />
            <ThemeToggleButton />
        </div>
      </Container>
    </header>
  );
};
export default Header;

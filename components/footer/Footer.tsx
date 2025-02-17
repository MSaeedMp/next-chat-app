import Container from "../global/Container";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full sm:pb-6  pb-3 bg-background">
      <Container className="flex justify-center">
        <p className="font-medium text-sm text-muted-foreground flex gap-2 items-center">
          <span>&copy; 2025</span>
          <a
            href="mailto:saeed.mafipour@gmail.com"
            className="text-muted-foreground hover:text-foreground underline"
          >
            M. Saeed Mafipour
          </a>
          <span>All Rights Reserved.</span>{" "}
        </p>
      </Container>
    </footer>
  );
};

export default Footer;

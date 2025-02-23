import Container from "@/components/global/Container";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <section className="h-[calc(100vh-3.6rem)] md:h-[calc(100vh-5.1rem)]">
      <Container className="h-full">
        <div className="h-full flex flex-col justify-center items-center text-center">
          <h1 className="font-inter font-semibold md:text-5xl text-4xl">
            Page not found.
          </h1>
          <p className="text-lg font-light text-foreground mt-10 max-w-[300px] lg:max-w-[400px]">
            The page you are looking for does not exist or has been moved.
          </p>
          <p className="text-base font-light text-muted-foreground mt-5 max-w-[400px]">
            You can return to the homepage{" "}
            <Link
              href="/"
              className="font-bold text-blue-700 underline hover:text-blue-500"
            >
              here
            </Link>
            .
          </p>
        </div>
      </Container>
    </section>
  );
};
export default NotFoundPage;

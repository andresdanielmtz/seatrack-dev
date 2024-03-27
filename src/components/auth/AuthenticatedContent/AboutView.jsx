import TitleButton from "../MainTitle/TitleButton";

export default function ProfileView() {

  return (
    <div className="flex items-center justify-center h-screen flex-col mx-10">
      <h1 className="text-4xl font-extrabold my-10">About Us</h1>

      <p className="text-lg italic mb-8 justify-center">
        Hello! I&apos;m Andrés Martínez and I&apos;m a Computer Science student @ ITESM.
        <br />
        <br />I created this project for learning and practicing purposes.
        <br /> This project helped me learn about React, Node.js, Express,
        MongoDB, and many other technologies.
      </p>

      <TitleButton address="/" color="bg-persian-blue-700">
        {" "}
        Return to Home{" "}
      </TitleButton>
    </div>
  );
}

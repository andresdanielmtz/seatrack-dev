import TitleButton from "../MainTitle/TitleButton";
const InstructionView = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-8 rounded-3xl shadow-md">
      <h1 className="font-extrabold text-2xl">Instructions</h1>
      <p>Instructions go here</p>
      <i className="text-red-500"> In development!</i>

      <TitleButton address="/" color="bg-persian-blue-700">
        Go Back
      </TitleButton>
    </div>
  );
};

export default InstructionView;

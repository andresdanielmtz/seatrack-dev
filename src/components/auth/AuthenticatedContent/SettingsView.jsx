import { Switch, FormLabel, FormControl } from "@chakra-ui/react";
import TitleButton from "../MainTitle/TitleButton.jsx";

const SettingsView = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white p-8 rounded-3xl shadow-md">
      <h1 className="text-4xl font-extrabold dark:text-white">Settings</h1>

      <i className="fas fa-rocket fa-10x mb-2">In development!</i>
      <div className="justify-center">
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="email-alerts" mb="0">
            Dark Mode
          </FormLabel>
          <Switch id="email-alerts" />
        </FormControl>
      </div>
      <TitleButton address="/" color="bg-persian-blue-500">
        Go back
      </TitleButton>
    </div>
  );
};

export default SettingsView;

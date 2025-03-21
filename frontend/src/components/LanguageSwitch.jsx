// src/components/LanguageSwitch.jsx
import { Button, ButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageSwitch = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <ButtonGroup sx={{ position: "absolute", top: 16, right: 16 }}>
      <Button
        onClick={() => changeLanguage("en")}
        variant={i18n.language === "en" ? "contained" : "outlined"}
      >
        EN
      </Button>
      <Button
        onClick={() => changeLanguage("fr")}
        variant={i18n.language === "fr" ? "contained" : "outlined"}
      >
        FR
      </Button>
    </ButtonGroup>
  );
};

export default LanguageSwitch;
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";
function GetStartedBtn() {
  const navigate = useNavigate();
  function goToS() {
    navigate("GetStarted");
  }
  return (
    <div>
      <Button onClick={goToS}>
        Get Started
        <FaArrowRight />
      </Button>
    </div>
  );
}

export default GetStartedBtn;

import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";
function StartJourneyBtn() {
  const navigate = useNavigate();
  function goToS() {
    navigate("GetStarted");
  }
  return (
    <div>
      <Button onClick={goToS}>
        Start Your Journey
        <FaArrowRight />
      </Button>
    </div>
  );
}

export default StartJourneyBtn;

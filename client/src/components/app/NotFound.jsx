import { useEffect } from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const Navigate = useNavigate();

  useEffect(() => {
    Navigate("/notfound");
  }, [Navigate]);

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button href="/" type="primary">
          {/* Back To Feed */}
          {window.localStorage.getItem("isLoggedIn")
            ? "Back To Feed"
            : "Back to Login"}
        </Button>
      }
    />
  );
}
export default NotFound;

import React from "react";
import { useNavigate } from "react-router-dom";
import MenuButton from "../Buttons/MenuButton";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PhotoRoundedIcon from "@mui/icons-material/PhotoRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import CardGiftcardRoundedIcon from "@mui/icons-material/CardGiftcardRounded";
import "./Footer.css";
import { useRecoilState } from "recoil";
import { hidingFooterState } from "../../atoms";

const Footer = () => {
  const [hideFooter, setHideFooter] = useRecoilState(hidingFooterState);

  const list = document.querySelectorAll(".list");
  function activeLink() {
    list.forEach((item) => {
      item.classList.remove("active");
      this.classList.add("active");
    });
  }
  list.forEach((item) => {
    item.addEventListener("click", activeLink);
  });

  const navigate = useNavigate();
  // const [user, setUser] = useState("sisca");

  // target을 사용하면 하위 요소인 span태그를 클릭 시, 해당 이벤트가 선택됨
  // currentTarget은 이벤트 핸들러를 갖고 있는 태그를 가리키므로, currentTarget을 사용해야 이벤트 캡쳐링으로 인한 오류를 막을 수 있음
  const handleClick = (e) => {
    const type = e.currentTarget.id;
    switch (type) {
      case "Home":
        navigate("/");
        break;
      default:
        navigate(`/${type}`);
        break;
    }
  };

  return (
    <>
      <div
        className={`w-full bg-slate-600 rounded-tr-lg rounded-tl-lg ${
          hideFooter ? "hidden" : "centerItem"
        }`}
      >
        <div className="navigation">
          <ul>
            <li className="list active" id="Home" onClick={handleClick}>
              <span className="icon">
                <HomeRoundedIcon />
              </span>
              <span className="text">Home</span>
            </li>
            <li className="list" id="Post" onClick={handleClick}>
              <span className="icon">
                <PhotoRoundedIcon />
              </span>
              <span className="text">Post</span>
            </li>
            <li className="list" id="Chat" onClick={handleClick}>
              <span className="icon">
                <ChatBubbleOutlineRoundedIcon />
              </span>
              <span className="text">Chat</span>
            </li>
            <li className="list" id="Place" onClick={handleClick}>
              <span className="icon">
                <PlaceRoundedIcon />
              </span>
              <span className="text">Place</span>
            </li>
            <li className="list" id="Gift" onClick={handleClick}>
              <span className="icon">
                <CardGiftcardRoundedIcon />
              </span>
              <span className="text">Gift</span>
            </li>
            <div className="indicator"></div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;

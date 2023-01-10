import React, { useEffect } from "react";
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

const Footer = ({ currentPage }) => {
  const [hideFooter, setHideFooter] = useRecoilState(hidingFooterState);
  const list = document.querySelectorAll(".list");

  // 화살표 함수로 선언하게 될 경우, this 바인딩이 되지 않기 때문에 함수 선언식으로 표현
  const menu = ["Home", "Post", "Chat", "Place", "Gift"];
  useEffect(() => {
    list.forEach((item, itemIndex) => {
      if (currentPage === menu[itemIndex]) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }, [currentPage]);

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

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from "../components/Logo.jsx";
import { Link } from "react-router-dom";
import './Home.css';
import { DatePicker } from 'antd';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Space } from 'antd';
import {useState} from 'react';
import {useEffect} from 'react';

const colors1 = ['#6253E1', '#04BEFE'];
const colors2 = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const colors3 = ['#40e495', '#30dd8a', '#2bb673'];
const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const Home = () => {
  const [testMessage, setTestMessage] = useState("None");

  function callAPI () {
    fetch("http://localhost:9000/testAPI")
        .then(res => res.text())
        .then(res => setTestMessage(res))
        .catch(err => setTestMessage("ERROR"));
  }

  useEffect(() => {
    callAPI();
  }, [])

  return (

    <Space>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
              colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
              colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
              lineWidth: 0,
            },
          },
          components: {
            Button: {
              colorPrimary: `linear-gradient(270deg, ${colors1.join(', ')})`,
              colorPrimaryHover: `linear-gradient(360deg, ${getHoverColors(colors1).join(', ')})`,
              colorPrimaryActive: `linear-gradient(45deg, ${getActiveColors(colors1).join(', ')})`,
              lineWidth: 0,
            },
          }
        }}
      >
        {
          <div>
            <div class="main">
              <div class="maintext">
                <h1> {testMessage}</h1>
                <h1>Discover and post food around Cornell's campus</h1>
                <Link to="/Search"><Button type="primary" size="large">
                  Find Food
                </Button>
                </Link>
                <Link to="/Post"><button class="post-food-btn">
                  Post
                </button>
                </Link>
              </div>
              <div class="main_image">
                <img src="mainimg.jpg" alt="Food Sharing"></img>
              </div>
            </div>
            {/* <div class="lowerbar">
            <div id="contactlower">
              <h4> Contact </h4>
              <ul>
                <li>Email</li>
                <li>Instagram</li>
                <li>Linkedin</li>
              </ul>
            </div>
            <div id="nav-lower">
              <h4> Navigate </h4>
              <ul>
                <li>About</li>
                <li>Find</li>
                <li>Post</li>
              </ul>
            </div>
          </div> */}
          </div>}






      </ConfigProvider>
    </Space>
  )
}


export default Home;
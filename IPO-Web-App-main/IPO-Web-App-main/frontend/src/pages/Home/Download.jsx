import React from "react";
import "./Download.css";
import scapApp from "../../assets/mobile-screen.jpeg";




const Download = () => {
  return (
    <div className="download-container">
      <div className="left-section">
        
        <h2 className="title">On The Go</h2>
        <p className="description">
          We believe that everyone should be able to wield technology while learn trading. Use Bluestock on the go, on your mobile device. Experience the ultimate trading experience on Android or IOS.
        </p>
        <div className="qr-download">
          <img src="https://th.bing.com/th/id/OIP.tTK48O-3dhK_KvsUNjW9qgHaHa?w=177&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" alt="QR Code" className="qr-code" />
          <div className="qr-text">
            <span className="scan-text">Scan and download</span>
            <p className="instruction">
              Use your Android device to download the app.
            </p>
          </div>
        </div>
        {/* <div className="feature-icons">
          <div className="feature">
            <img src="https://s3-alpha-sig.figma.com/img/de34/3667/a22cc1f1dc72a5c7d32b49d20f106e29?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=mSIrYswc2V45wK21u6tZZ9KfGVQ~0oNBxe1ztkRR68R5msPU4S8fVlUjTrBkEZATRkJ~4vQXfymjWmIMB5h-mwL2ZT1c9TFEprm7TerAil81JWRNDL02O8LXuSlSMwJK3w9KcXvXU5cphaVyhwAbVDmWFRbk8JOr~6sY7b4V4rG1fVEom8MkAWk~f40lnV2pJER0TvyiCIxwcwGKQcFs7TOiBm4hWTk9tF0HyQxcR1iChx~vZiVYRHqrTKUC7KHOsx42qVcrbI-2kNA4KcuWR0Bijo8C3xKH9U980gS7OSegm8HVOdXKs68QmoCeiBKFQnEY9w-m6PTVif9Fwq75Jg__" alt="Analytics" />
            <span>Analytics</span>
          </div>
          <div className="feature">
            <img src="https://s3-alpha-sig.figma.com/img/65e0/bec9/c8652dec3a3e026fa0b46ec4a2e94031?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Kk2PReeJDYqFvgRi2O1qMKvimI3skMzqM0QTSit2ywjzxJjbK4Uoqhp-oVEzkhveudEiULqtbqtCxcwLUNW1k7kLL6ueVgGjnaawZBIBXmISzq~z-GaiRivKpMs6y1DNNyKB3ZNC9nRVRCMh08m3W1qNkx3IQZGc2b6vseTLw2lYPGoZw6UqrrT-AzocZfyI6njb3YLAHwM9S176BCQQes4gMl9rSbQVtjyB0PG-An7RI9a1fj8FiiGEDU4GRtf8F2HKXC9kndIQevLeJNCVKIAu-ZNJ5Ph7Q-VVB3L--xsG2eGd7u1ja~n6-HyHWAg0HdTHTXHUguuIyLmvrYaZvA__" alt="Blogs" />
            <span>Blogs</span>
          </div>
          <div className="feature">
            <img src="https://s3-alpha-sig.figma.com/img/9203/bb43/b5d785856df6b2b12b0abc8949d3fcb9?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=erV2w6qrtQu6y2XYvDsFGdOLJfS0JZqjDGQ9iGSCDfxPe6VsAsMS8LHgRIBg7VK9zmA49iPusazlH4utR4U20yW3qdxtWL58KPv1nNUO9xIJhFFRzm9Z6wyKxMdr46VQgkAkXflnm8u3HRArbuSZ--uJTtQYfkofaa4XZE~qdX6laII0rRI7iKbcvAP5nTLSYE64pkuogS~aU51eVa3nWs4F8FRzh7u7g5r2n8gI13C4DW~ypYGWSamAH1IL7UpNMb7mmHJ9GJYeG6dntP8DQ7QfXJ5OEQFHvD8XEQAtl1aW~u~HuBdT8dhxtLFPKSKyCsfguAZkQIrvkcy1koU4dg__" alt="Videos" />
            <span>Videos</span>
          </div>
        </div> */}
      </div>

      <div className="right-section">
        <img src={scapApp} alt="Scap App"  className="mobile-image"/>
      </div>
    </div>
  );
};

export default Download;

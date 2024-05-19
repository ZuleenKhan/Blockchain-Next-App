const Loader = () => {
    return (
      <div className="loaderContainer">
        <div className="loader"></div>
        <style jsx>{`
          .loaderContainer {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.5);
            z-index: 9999;
          }
  
          /* HTML: <div class="loader"></div> */
.loader {
  width: fit-content;
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  background: radial-gradient(circle closest-side,#000 94%,#0000) right/calc(200% - 1em) 100%;
  animation: l24 1s infinite alternate linear;
}
.loader::before {
  content: "Loading...";
  line-height: 1em;
  color: #0000;
  background: inherit;
  background-image: radial-gradient(circle closest-side,#fff 94%,#000);
  -webkit-background-clip:text;
          background-clip:text;
}

@keyframes l24{
  100%{background-position: left}
}
        `}</style>
      </div>
    );
  };
  
  export default Loader;


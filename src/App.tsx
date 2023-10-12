import { ChangeEvent, useState } from "react";
import "./App.css";

const App = () => {
  const [height, setHeight] = useState(100);
  const [width, setWidth] = useState(100);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) return;

    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          const link = document.createElement("a");
          link.download = file.name;
          link.href = canvas.toDataURL();
          link.click();
        };
      };
    }
  };

  return (
    <>
      <h1>Resize</h1>
      <form>
        <label htmlFor="canvas-width">Canvas Width:</label>
        <input
          type="number"
          id="canvas-width"
          placeholder="Enter canvas width"
          value={width}
          onChange={(e) => setWidth(parseInt(e.target.value))}
        />
        <label htmlFor="canvas-height">Canvas Height:</label>
        <label htmlFor="canvas-height">Canvas Height:</label>
        <input
          type="number"
          id="canvas-height"
          placeholder="Enter canvas height"
          value={height}
          onChange={(e) => setHeight(parseInt(e.target.value))}
        />
        <label htmlFor="image-upload">Upload Image:</label>
        <input
          type="file"
          id="image-upload"
          multiple
          onChange={handleOnChange}
        />
      </form>
    </>
  );
};

export default App;

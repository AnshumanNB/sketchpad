import React, { useState, useRef } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import SettingsPopup from './SettingsPopup';

const SketchPad = () => {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [showPopup, setShowPopup] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });

  const stageRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.evt.button === 1) {
      e.evt.preventDefault();
      setPopupPosition({ x: e.evt.clientX, y: e.evt.clientY });
      setShowPopup(!showPopup);
      return;
    }

    const pos = e.target.getStage().getPointerPosition();
    setIsDrawing(true);
    setLines([
      ...lines,
      { points: [pos.x, pos.y], color, brushSize }
    ]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    const updatedLines = [...lines];
    const lastLine = updatedLines[updatedLines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    updatedLines[updatedLines.length - 1] = lastLine;
    setLines(updatedLines);
  };

  const handleMouseUp = () => setIsDrawing(false);

  const exportToJPG = () => {
    const uri = stageRef.current.toDataURL({
      mimeType: 'image/png',
      quality: 1,
      pixelRatio: 2,
    });

    const link = document.createElement('a');
    link.download = 'sketch.png';
    link.href = uri;
    link.click();
  };

  return (
    <div className='containe'>
        <div className='d-flex align-items-center justify-content-center bg-dark text-light p-2'>
            <p className='paraname d-flex align-items-center justify-content-center m-0 px-5 h4' >Sketchpad - Draw with Left Mouse Button, Change color and brush size with Middle Mouse Button</p>
            <button onClick={exportToJPG}>Export PNG</button>
      </div>
      <Stage
        className='stage d-flex align-items-center justify-content-center'
        width={window.innerWidth * 0.80}
        height={window.innerWidth * 0.45}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          {lines.map((line, index) => (
            <Line
              key={index}
              points={line.points}
              stroke={line.color}
              strokeWidth={line.brushSize}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation="source-over"
            />
          ))}
        </Layer>
      </Stage>

      {showPopup && (
        <SettingsPopup
          x={popupPosition.x}
          y={popupPosition.y}
          color={color}
          setColor={setColor}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
        />
      )}
    </div>
  );
};

export default SketchPad;

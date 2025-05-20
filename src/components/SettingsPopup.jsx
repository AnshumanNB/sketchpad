import React from 'react';
import { ChromePicker } from 'react-color';

const SettingsPopup = ({ x, y, color, setColor, brushSize, setBrushSize }) => {
  return (
    <div
      className="settings-popup"
      style={{
        position: 'absolute',
        top: y,
        left: x,
        zIndex: 1000,
        background: '#555',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.6)',
      }}
    >
      <ChromePicker color={color} onChangeComplete={(c) => setColor(c.hex)} />
      <div style={{ marginTop: '10px' }}>
        <label>
          Brush Size: {brushSize}
          <input
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            style={{ width: '100%' }}
          />
        </label>
      </div>
    </div>
  );
};

export default SettingsPopup;

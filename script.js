body {
    margin: 0;
    background: #0c0c0c;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    color: white;
}

.wrapper {
    max-width: 430px;
    margin: auto;
    padding: 20px;
}

h1 {
    font-weight: 600;
    margin-bottom: 20px;
}

.card {
    background: #141414;
    padding: 22px;
    border-radius: 26px;
    box-shadow: 0 0 45px rgba(0,0,0,0.4);
    margin-bottom: 22px;
}

label {
    font-size: 15px;
    opacity: 0.9;
}

input {
    width: 100%;
    margin: 10px 0 18px;
    padding: 14px;
    border: none;
    border-radius: 18px;
    background: #1e1e1e;
    color: white;
    font-size: 17px;
}

.btn-row {
    display: flex;
    gap: 10px;
}

button {
    flex: 1;
    padding: 14px;
    border: none;
    border-radius: 18px;
    background: #2d4f81;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

button:active {
    transform: translateY(1px);
}

#hint {
    opacity: 0.8;
    font-size: 15px;
}

.row {
    display: flex;
    justify-content: space-between;
    padding: 14px 4px;
    font-size: 18px;
    border-bottom: 1px solid #2a2a2a;
}

.row:last-child {
    border-bottom: none;
}

.hidden {
    display: none;
}

.refRow {
    margin-top: 10px;
    font-size: 13px;
    opacity: 0.55;
    text-align: left;
}

#shareBtn {
    margin-top: 16px;
    width: 100%;
    background: #1f6a3a;
}

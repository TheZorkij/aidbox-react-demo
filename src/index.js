/**
 * @author Михаил Правиленко <zorkijofficial@gmail.com>
 */
import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import "./index.css";

/**
 * Рендерит содержимое для отправления в браузер
 *
 * @param {ReactElement} - элемент React для рендеринга
 *        {DOMElement} - элемент DOM, в который нужно добавить элемент React
 */
ReactDOM.render(
    <Main/>,
    document.getElementById("root")
);

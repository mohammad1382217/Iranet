import React from 'react'

export const H1Title: React.FC<{ BoldTitle: string, H1class: string }> = ({ BoldTitle, H1class }) => {
    return <h1 className={H1class}>{BoldTitle}</h1>;
};

export const Parag: React.FC<{ Paragraph: string, Pclass: string }> = ({ Paragraph, Pclass }) => {
    return <p className={Pclass}>{Paragraph}</p>;
};

export const Button: React.FC<Button> = ({ children, Type, ClassName, OnClick }) => {
    return (
        <button type={Type} className={ClassName} onClick={OnClick}>
            {children}
        </button>
    );
};

// types
interface Button {
    children?: React.ReactNode
    Type: "button" | "submit" | "reset" | undefined
    ClassName: string
    OnClick?: React.MouseEventHandler<HTMLButtonElement>
}
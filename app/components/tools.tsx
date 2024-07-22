import React from 'react'

export const H1Title: React.FC<{ BoldTitle: string, H1class: string , dir?: string }> = ({ BoldTitle, H1class, dir }) => {
    return <h1 dir={dir} className={H1class}>{BoldTitle}</h1>;
};

export const Parag: React.FC<{ Paragraph: string, Pclass: string }> = ({ Paragraph, Pclass }) => {
    return <p lang="fa" role="text" className={Pclass}>{Paragraph}</p>;
};
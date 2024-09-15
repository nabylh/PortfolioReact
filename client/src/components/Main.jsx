import React from "react";

function Main() {
  return (
    <>
      <main>
        <section id="apropos">
          <article className="mainTexte">
            <h1>__Welcome to my portfolio !</h1>
            <p>
              I’m a junior web developer full stack passionate about coding and
              technology.
              <br />
              Explore my projects and dive into articles that cover the latest
              in web development, tech trends,
              <br />
              and innovations in the digital world. Join me on a journey !
              <br />
              <br />
              <span>Nabil Achouri </span>
            </p>
          </article>

          <img className="capture2" src="/images/export.png" alt="capture2" />

          <article className="presentation">
            <h1>Pour Mieux vous accompagner</h1>
            <h3>Présentation de mes Compétences</h3>
          </article>

          <article className="logo">
            <img
              src="/images/java-script.png"
              alt="logo javascript"
              width="150"
              height="150"
            />
            <img
              src="/images/sql-server.png"
              alt="logo sql server"
              width="150"
              height="150"
            />
            <img
              src="/images/css-3.png"
              alt="logo css"
              width="150"
              height="150"
            />
            <img
              src="/images/logojs.png"
              alt="logo js"
              width="150"
              height="150"
            />
          </article>
        </section>

        <section id="portfolio">
          <article className="listePortfolio">
            <h2>
              Portfolio <span>Liste non exhaustive</span>
            </h2>
          </article>

          <article className="text1">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              voluptatem, eaque laborum suscipit tenetur deserunt omnis rerum et
              maxime adipisci cumque obcaecati ipsam totam aut? Non suscipit
              facilis voluptatem dolores? Fugit iure quibusdam, asperiores qui
              atque unde corrupti sint, pariatur impedit accusantium odit nisi
              consequuntur reiciendis praesentium commodi adipisci quos ullam
              saepe maxime voluptatem, sunt nihil illo exercitationem!
              Voluptate, nam.
            </p>
            <img
              src="/images/laptop.jpg"
              alt="laptop"
              width="500"
              height="300"
            />
          </article>
        </section>

        <section id="mycv">
          <a href="/plaquette/link/CV2023.24PE.pdf">
            <h2>Telecharger mon CV </h2>
          </a>
        </section>
      </main>
    </>
  );
}

export default Main;

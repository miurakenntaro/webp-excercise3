import { useEffect, useState } from "react";
import { fetchImages } from "./api";
function Header() {
  return (
    <header className="hero is-dark is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">amiibo Images</h1>
          <h2>日本大学文理学部情報科学科 Webプログラミング演習3</h2>
            <p>学籍番号 : 5421043</p>
            <p>氏名 : 三浦健太郎</p>

        </div>
      </div>
    </header>
  );
}


  function Image(props) {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image">
        <img src={props.src} alt="amiibo!" />


        </figure>
      </div>
    </div>
  );
}
function Loading() {
  return <p>Loading...</p>;
}

function Gallery(props) {
  const { urls } = props;
  if (urls == null) {
    return <Loading />;
  }
  return (
    <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url.image} className="column is-3">
            <Image src={url.image} />
          </div>
        );
      })}
    </div>
  );
}
function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { breed } = event.target.elements;
    props.onFormSubmit(breed.value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="field has-addons">
          <div className="control is-expanded">
            <div className="select is-fullwidth">
              <select name="breed" defaultValue="mario">
                <option value="mario">mario</option>
                <option value="Zelda">Zelda</option>
                <option value="Peach">Peach</option>
                <option value="Yoshi">Yoshi</option>
                <option value="Bowser">Bowser</option>
               
              </select>
            </div>
          </div>
          <div className="control">
            <button type="submit" className="button is-dark">
              Reload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Main() {
  const [urls, setUrls] = useState(null);
  useEffect(() => {
    fetchImages("mario").then((urls) => {
      setUrls(urls);
    });
  }, []);
  function reloadImages(breed) {
    fetchImages(breed).then((urls) => {
      setUrls(urls);
    });
  }
  return (
    <main>
       <section className="section">
        <div className="container">
          <Form onFormSubmit={reloadImages} />
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urls={urls} />
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>amiibo image are retrieved from amiibo API</p>
        <p>
          <a href="https://www.amiiboapi.com">Donate to amiibo API</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
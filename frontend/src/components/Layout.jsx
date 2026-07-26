const Layout = (props) => {
  return (
    <div>
      <header>共通ヘッダー</header>
      <main>
        {props.children}
      </main>
    </div>
  );
};

export default Layout;
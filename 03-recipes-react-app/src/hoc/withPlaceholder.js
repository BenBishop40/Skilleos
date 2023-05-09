const withPlaceholder = (WrappedComponent) => (props) => {
    console.log("HOC");
    return <WrappedComponent placeholder="Mon HOC" {...props} />;
};
export default withPlaceholder;

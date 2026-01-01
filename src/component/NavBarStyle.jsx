const NavbarStyle=({isActive})=>({
    color:isActive?'#007bff':'#fff',
    fontWeight: isActive?'bold':'normal',
    padding:'5px 10px'
    
});
export default NavbarStyle;
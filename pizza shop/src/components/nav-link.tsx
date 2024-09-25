import { Link, LinkProps, useLocation } from "react-router-dom";

export interface NavLinkProps extends LinkProps{}

export function NavLink(props: NavLinkProps) {
    const {pathname} = useLocation()

    return <Link {...props} data-current={pathname === props.to} className="flex items-center text-sm font-medium gap-1.5 text-foreground/60 hover:text-foreground/80 data-[current=true]:text-foreground" />
}
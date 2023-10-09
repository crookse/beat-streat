import { useCallback, useEffect, useMemo, useState } from "react";
import Layout from "./components/core/Layout";
import Map from "./components/screens/Map";
import Reports from "./components/screens/Reports";
import Loading from "./components/screens/Loading";
import { MapIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import Account from "./components/screens/Account";
import { ErrorBoundary } from "./components/core/ErrorBoundary";
import { env } from "./utils/env";
import Nav, { NavItem } from "./components/core/NavBar";
import AvatarWithLoginProxy from "./components/proxies/AvatarWithLoginProxy";

const config = {
  loading_time: env("REACT_APP_CONF_SPLASH_SCREEN_LOADING_TIME", 2),
  mobile_tab_icon_size: env("REACT_APP_CONF_MOBILE_TAB_ICON_SIZE", 20),
  enable_login: env("REACT_APP_FLAG_ENABLE_LOGIN_OTHENT", true),
  enable_map: env("REACT_APP_FLAG_ENABLE_MAP_WHAT3WORDS", false),
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [wallet, setWallet] = useState(null);
  const [currentNavItem, setCurrentNavItem] = useState<null | NavItem>();
  // const [hasNewMessages, setHasNewMessages] = useState<boolean>(false);

  const navItems = useCallback(() => {
    const ret: NavItem[] = [
      {
        display_name: "Map",
        screen_key: "Map",
        mobile_icon: (
          <MapIcon
            width={config.mobile_tab_icon_size}
            height={config.mobile_tab_icon_size}
          />
        ),
      },
    ];

    if (wallet) {
      ret.push({
        display_name: "Reports",
        screen_key: "Reports",
        mobile_icon: (
          <TableCellsIcon
            width={config.mobile_tab_icon_size}
            height={config.mobile_tab_icon_size}
          />
        ),
      });
    }

    return ret;
  }, [
    wallet,
  ]);

  const accountNavItem: NavItem = useMemo(() => ({
    display_name: "Account",
    screen_key: "Account",
    mobile_icon: null,
  }), []);

  useEffect(() => {
    // Default to showing the first screen
    if (!currentNavItem) {
      setCurrentNavItem(navItems()[0]);
    }
  }, [
    currentNavItem,
    navItems,
    setCurrentNavItem,
  ]);

  // useEffect(() => {
  //   setHasNewMessages(true);
  // }, [
  //   setHasNewMessages,
  // ]);

  // TODO(crookse) Check memoization
  const renderNav = useCallback(() => {
    return (
      <Nav
        clearSelected={currentNavItem?.screen_key === "Account"}
        navItems={navItems()}
        avatar={() => {
          return (
            <AvatarWithLoginProxy
              isLoggedIn={wallet !== null}
              onClickAvatar={() => {
                setCurrentNavItem(accountNavItem);
              }}
              onLogin={(retrievedWallet) => {
                setWallet(retrievedWallet);
              }}
            />
          );
        }}
        onChangeNavItem={(item) => {
          setCurrentNavItem(item);
        }}
      />
    );
  }, [
    wallet,
    accountNavItem,
    currentNavItem,
    navItems,
  ]);

  const renderScreen = useCallback(() => {
    const screens: Record<string, () => JSX.Element> = {
      Map: () => {
        return (
          <ErrorBoundary message="The map is currently having connection issues. Please try again later.">
            <Map
              enable={config.enable_map}
              wallet={wallet}
              onReported={(e) => {
                console.log(`Reporting current marker: `, { e });
              }}
            />
          </ErrorBoundary>
        );
      },
      Reports: () => {
        return <Reports wallet={wallet} />;
      },
      Account: () => {
        return <Account wallet={wallet} />;
      },
    };

    if (!currentNavItem?.screen_key) {
      return null; // TODO(crookse) Show something informative
    }

    try {
      const Component = screens[currentNavItem.screen_key];
      return <Component />;
    } catch (error) {
      console.log(`Error rendering screen`, { error });
    }

    return null; // TODO(crookse) Show something informative
  }, [
    currentNavItem,
    wallet,
  ]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, config.loading_time * 1000);
  }, [
    setLoading,
  ]);

  // The components below follow a z-index pattern where screens are loaded and
  // move forward and backward based on their z-index.
  return (
    <div className="w-full h-full flex">
      <Loading
        show={loading}
        onClick={() => {
          setLoading(false);
        }}
      />
      <div className="w-full h-full">
        <Layout
          navBar={renderNav()}
          main={renderScreen()}
        />
      </div>
    </div>
  );
}

<script lang="ts">
import { h, ref, computed, CSSProperties, defineComponent, onMounted, watch } from "vue";
import router from "@/router/router.ts";
import { NIcon, NMessageProvider, NDialogProvider } from "naive-ui";
import type { MenuOption } from "naive-ui";
import {
  EarthOutline,
  BookOutline,
  CaretDownOutline,
  SunnyOutline,
  MoonOutline,
  PersonCircleOutline
} from "@vicons/ionicons5";

export default defineComponent({
  components: {
    PersonCircleOutline,
    NMessageProvider,
    NDialogProvider
  },
  setup() {
    const collapsed = ref(true);
    const isDarkTheme = ref(false);

    onMounted(() => {
      const storedTheme = localStorage.getItem("isDarkTheme");
      if (storedTheme !== null) {
        isDarkTheme.value = storedTheme === "true";
      }
    });

    watch(isDarkTheme, (newValue) => {
      localStorage.setItem("isDarkTheme", newValue.toString());
    });

    function handleCollapse() {
      collapsed.value = true;
    }

    function handleExpand() {
      collapsed.value = false;
    }

    function handleRouterToHome() {
      router.push("/home");
    }

    const buttonTheme = () => {
      isDarkTheme.value = !isDarkTheme.value;
    };

    const menuOptions: MenuOption[] = [
      {
        label: 'Home',
        key: 'home',
        onClick: handleRouterToHome
      },
      {
        label: 'Templates',
        key: 'templates',
        children: [
          {
            label: 'Template 01',
            key: 'template1',
            href: '/template1'
          },
          {
            label: 'Template 02',
            key: 'template2',
            href: '/template2'
          },
          {
            label: 'Template 03',
            key: 'template3',
            href: '/template3'
          }
        ]
      },
      {
        label: "Theme",
        key: "theme",
        onClick: buttonTheme
      },
    ];

    const contentStyle = computed(() => {
      const style: CSSProperties = {
        marginLeft: collapsed.value ? "64px" : "240px",
        transition: "margin-left 0.3s, background-color 0.3s, color 0.3s",
        backgroundColor: isDarkTheme.value ? "#214B63" : "#E8E8E8",
        color: isDarkTheme.value ? "#FFFFFF" : "#000000",
        flex: "auto",
        overflowY: "auto"
      };
      return style;
    });

    const renderMenuLabel = (option: MenuOption) => {
      if ("href" in option) {
        return h("a", { href: option.href }, [option.label as string]);
      }
      return option.label as string;
    };

    const renderMenuIcon = (option: MenuOption) => {
      if (option.key === "home") {
        return h(NIcon, null, { default: () => h(EarthOutline) });
      } else if (option.key === "templates") {
        return h(NIcon, null, { default: () => h(BookOutline) });
      } else if (option.key === "theme") {
        return h(NIcon, null, {
          default: () => (isDarkTheme.value ? h(SunnyOutline) : h(MoonOutline)),
        });
      } else {
        return null;
      }
    };

    const expandIcon = () => {
      return h(NIcon, null, { default: () => h(CaretDownOutline) });
    };

    return {
      menuOptions,
      collapsed,
      handleCollapse,
      handleExpand,
      contentStyle,
      renderMenuLabel,
      renderMenuIcon,
      expandIcon,
      buttonTheme
    };
  },
});
</script>

<template>
  <n-dialog-provider>
    <n-message-provider>
      <n-layout has-sider>
        <n-layout-sider bordered collapse-mode="width" :collapsed-width="64" :width="240" :collapsed="collapsed"
          show-trigger @collapse="handleCollapse" @expand="handleExpand">
          <svg style="margin-top: 18px" xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="0 0 50 40"
            fill="none">
            <g clip-path="url(#clip0_914_712)">
              <text x="5" y="30" font-family="Arial, sans-serif" font-size="30" font-weight="bold" fill="#008C77">
                M
              </text>
              <text x="25" y="30" font-family="Arial, sans-serif" font-size="30" font-weight="bold" fill="#214B63">
                G
              </text>
            </g>
            <defs>
              <clipPath id="clip0_914_712">
                <rect width="50" height="40" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
          <n-menu :collapsed="collapsed" :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions"
            :render-label="renderMenuLabel" :render-icon="renderMenuIcon" :expand-icon="expandIcon" />
        </n-layout-sider>
        <div :style="contentStyle">
          <router-view></router-view>
        </div>
      </n-layout>
    </n-message-provider>
  </n-dialog-provider>
</template>

<style scoped>
.n-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.n-layout-sider {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
}
</style>
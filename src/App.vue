<script lang="ts">
import { h, ref, computed, CSSProperties, defineComponent, onMounted, watch } from "vue";
import router from "@/router/router.ts";
import { NIcon, NMessageProvider, NDialogProvider } from "naive-ui";
import type { MenuOption } from "naive-ui";
import {
  SettingsOutline,
  RocketOutline,
  CaretDownOutline,
  SunnyOutline,
  MoonOutline,
  PersonCircleOutline,
  ColorFilterOutline
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

    function handleRouterToTemplate1() {
      router.push("/template1");
    }

    function handleRouterToTemplate2() {
      router.push("/template2");
    }

    function handleRouterToTemplate3() {
      router.push("/template3");
    }

    const buttonTheme = () => {
      isDarkTheme.value = !isDarkTheme.value;
    };

    const menuOptions: MenuOption[] = [
      {
        label: "Template 01",
        key: "template1",
        onClick: handleRouterToTemplate1
      },
      {
        label: "Template 02",
        key: "template2",
        onClick: handleRouterToTemplate2
      },
      {
        label: "Template 03",
        key: "template3",
        onClick: handleRouterToTemplate3
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
      if (option.key === "template1") {
        return h(NIcon, null, { default: () => h(SettingsOutline) });
      } else if (option.key === "template2") {
        return h(NIcon, null, { default: () => h(RocketOutline) });
      } else if (option.key === "template3") {
        return h(NIcon, null, { default: () => h(ColorFilterOutline) });
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
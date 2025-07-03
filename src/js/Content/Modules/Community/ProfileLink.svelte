<script lang="ts">
    import Settings from "@Options/Data/Settings";
    import external from "@Content/externalLink";
    import ProfileLinkIcon from "@Icons/ProfileLinkIcon.svelte";

    export let id: string;
    export let href: string;
    export let iconUrl: string|undefined = undefined;
    export let noIcon: boolean|undefined = undefined;
    export let total: number|undefined = undefined;

    const iconType: "gray"|"color"|"none" = Settings.show_profile_link_images;
</script>


<svelte:options preserveWhitespace={true} />
<div class="profile_count_link">
    <a class="link" {href} use:external>
        {#if iconType !== "none" && noIcon !== true}
            <ProfileLinkIcon {id} {iconUrl} gray={iconType === "gray"} />
        {/if}
        <span class="count_link_label"><slot></slot></span>
        <span>&nbsp;&nbsp;</span> <!--Matches how Steam normally formats the links-->
        <span class="profile_count_link_total">{@html total != undefined ? total : '&nbsp;&nbsp;'}</span> <!-- &nbsp; fallback matches Steam spacing -->
    </a>
</div>


<style>
    .link {
        display: inline-flex;
        align-items: center;
    }
</style>

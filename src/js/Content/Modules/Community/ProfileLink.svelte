<script lang="ts">
    import Settings from "@Options/Data/Settings";
    import external from "@Content/externalLink";
    import ProfileLinkIcon from "@Icons/ProfileLinkIcon.svelte";

    export let id: string;
    export let href: string;
    export let iconUrl: string|undefined = undefined;
    export let hideIcon: string|undefined = undefined;
    export let total: number|undefined = undefined;

    const iconType: "gray"|"color"|"none" = Settings.show_profile_link_images;
</script>


<svelte:options preserveWhitespace={true} />
<div class="profile_count_link">
    <a class="link" {href} use:external>
        {#if iconType !== "none"}
            {#if hideIcon !== "true"}
                <ProfileLinkIcon {id} {iconUrl} gray={iconType === "gray"} />
            {/if}
        {/if}
        <span class="count_link_label"><slot></slot></span>
        {#if total != undefined && total > 0}
            <span>&nbsp;&nbsp;</span> <!--Matches how ZSteam normally formats the link-->
            <span class="profile_count_link_total">{total}</span>
        {:else}
            <span class="profile_count_link_total">&nbsp;</span> <!-- Steam spacing -->
        {/if}
    </a>
</div>


<style>
    .link {
        display: inline-flex;
        align-items: center;
    }
</style>

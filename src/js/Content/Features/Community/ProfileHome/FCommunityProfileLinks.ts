import self_ from "./FCommunityProfileLinks.svelte";
import Feature from "@Content/Modules/Context/Feature";
import type CProfileHome from "@Content/Features/Community/ProfileHome/CProfileHome";
import SteamCommunityApiFacade from "@Content/Modules/Facades/SteamCommunityApiFacade";
import HTML from "@Core/Html/Html";

export default class FCommunityProfileLinks extends Feature<CProfileHome> {

    private _reviewCount: number = 0;

    override checkPrerequisites(): boolean {
        return this.context.steamId !== null;
    }

    override apply(): void {

        this.asyncApply();
    
    }

    private async asyncApply(): Promise<void> {
        let linksNode = document.querySelector(".profile_item_links");
        if (linksNode == null) {
            const rightColNode = document.querySelector(".profile_rightcol");
            HTML.beforeEnd(rightColNode, `<div class="profile_item_links"></div>`);
            HTML.afterEnd(rightColNode, '<div style="clear: both;"></div>');

            linksNode = document.querySelector(".profile_item_links");
        }

        let hasReviews = false;
        const linkLabelNodes = linksNode?.querySelectorAll("span.count_link_label");
        if (linkLabelNodes != undefined) {
            for (const value of linkLabelNodes) {
                if (value.innerHTML === "Reviews") {
                    hasReviews = true;
                }
            }
        }

        let reviewCount = 0;
        if (!hasReviews) {
            reviewCount = await SteamCommunityApiFacade.getReviewCount(window.location.pathname);
        }

        (new self_({
            target: document.querySelector(".profile_item_links")!,
            props: {
                steamId: this.context.steamId!,
                clear: false,
                language: this.context.language?.name,
                addReviews: reviewCount > 0,
                total: reviewCount,
            }
        }));
    }
}

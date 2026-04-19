import { useLocalObservable } from "mobx-react-lite";
import { HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { useEffect, useRef } from "react";
import type { ActivityComment } from "../types";
import { runInAction } from "mobx";

export const useComments = (activityId?: string) => {
    const created = useRef(false);
    const commentStore = useLocalObservable(() => ({
        comments: [] as ActivityComment[],
        hubConnection: null as HubConnection | null,

        createHubConnection(activityId: string) {
            if (!activityId) return;

            this.hubConnection = new HubConnectionBuilder()
                .withUrl(`${import.meta.env.VITE_COMMENTS_URL}?activityId=${activityId}`, {
                    withCredentials: true
            })
                .withAutomaticReconnect()
                .build();

            this.hubConnection.start()
                .catch(error => console.log("Error establishing connection: ", error));

            //#region SignalR event handlers
            this.hubConnection.on("LoadComments", (comments: ActivityComment[]) => { // Listen for the "LoadComments" event from the server
                runInAction(() => { // Use runInAction to update the observable state within the MobX store
                    this.comments = comments; // Set the comments array to the loaded comments from the server
                });
            });

            this.hubConnection.on("ReceiveComment", (comment: ActivityComment) => { // Listen for the "ReceiveComment" event from the server
                runInAction(() => { // Use runInAction to update the observable state within the MobX store
                    this.comments.unshift(comment); // Add the new comment to the beginning of the comments array
                });
            });
            //#endregion
        },

        stopHubConnection() {
            if (this.hubConnection?.state === HubConnectionState.Connected) {
                this.hubConnection.stop()
                    .catch(error => console.log("Error stopping connection: ", error));
            }
        }
    }));

    // Create the hub connection when the component mounts and stop it when the component unmounts
    useEffect(() => {
        if (activityId && !created.current) {
            commentStore.createHubConnection(activityId);
            created.current = true;
        }

        return () => {
            commentStore.stopHubConnection();
            commentStore.comments = []; // Clear comments when the component unmounts or when the activityId changes to prevent showing comments from a previous activity when switching between activities quickly
        }
    }, [activityId]); // Re-run the effect if the activityId changes

    return { commentStore };
};
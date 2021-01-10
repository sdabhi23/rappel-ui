/*
  Copyright 2021 Shrey Dabhi

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import "./index.css";
import { Component } from "react";
import { Redirect } from "react-router-dom";
import Board from "react-trello";
import {
  Button,
  Dimmer,
  Loader,
  Tab,
  Modal,
  Label,
  Icon,
} from "semantic-ui-react";
import { clear, get, set } from "idb-keyval";
import {
  EyeIcon,
  GitPullRequestIcon,
  LockIcon,
  PackageIcon,
  RepoForkedIcon,
  ShieldIcon,
  StarIcon,
} from "@primer/octicons-react";
import ReactQuill from "react-quill";

import constants from "../../constants";
import logo from "../../img/logo.png";
import { pickTagTextColor, verifyCreds } from "../../utils";
import RepoCard from "../../components/board-card";

const handleDragEnd = (
  cardId,
  sourceLaneId,
  targetLaneId,
  position,
  cardDetails
) => {
  var sourceStatus = parseInt(sourceLaneId.substr(-1));
  var targetStatus = parseInt(targetLaneId.substr(-1));
  console.log("card moved");
  console.log(cardDetails.repo.repo_id);
  console.log(sourceStatus);
  console.log(targetStatus);
  if (sourceStatus != targetStatus) {
    fetch(
      constants.API_BASE + `github/repos/update/${cardDetails.repo.repo_id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Token " + localStorage[constants.STORAGE_NAME],
        },
        body: JSON.stringify({
          status: targetStatus,
        }),
      }
    ).then((response) => console.log(response.status));
  }
};

const laneIds = ["Lane0", "Lane1", "Lane2", "Lane3", "Lane4"];

const editorModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }, { size: [] }],
    [
      { color: [] },
      { background: [] },
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "link",
    ],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
  clipboard: {
    matchVisual: true,
  },
};

const editorFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "color",
  "background",
];

class Dashboard extends Component {
  state = {
    loading: true,
    logged: true,
    responseCode: 0,
    openRepoModal: false,
    repoModal: {},
    repoModalNotes: "",
    board_data: {
      lanes: [
        {
          id: "Lane0",
          title: "Backlog",
          cards: [],
        },
        {
          id: "Lane1",
          title: "Active Repos",
          cards: [],
        },
        {
          id: "Lane2",
          title: "Work In Progress",
          cards: [],
        },
        {
          id: "Lane3",
          title: "Completed",
          cards: [],
        },
        {
          id: "Lane4",
          title: "Archived Repos",
          cards: [],
        },
      ],
    },
  };

  panes = [
    {
      menuItem: "Github Repos",
      render: () => (
        <Tab.Pane>
          <Dimmer active={this.state.loading} inverted>
            <Loader size="massive" inverted>
              Loading
            </Loader>
          </Dimmer>

          <Modal
            closeOnEscape={false}
            closeIcon={false}
            closeOnDimmerClick={false}
            open={this.state.openRepoModal}
            dimmer="blurring">
            <Modal.Header>
              {"@" +
                this.state.repoModal.owner +
                "/" +
                this.state.repoModal.name +
                " "}
              {this.state.repoModal.is_fork && (
                <RepoForkedIcon className="fork-repo octicon" size={20} />
              )}
              {this.state.repoModal.is_private && (
                <LockIcon className="private-repo octicon" size={20} />
              )}
              <a
                href={this.state.repoModal.url}
                target="_blank"
                rel="noopener noreferrer">
                <Icon name="external square" />
              </a>
            </Modal.Header>
            <Modal.Content>
              <Label.Group
                style={{
                  paddingBottom: 6,
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}>
                <Label color="grey">
                  <StarIcon size={13} /> {this.state.repoModal.star_count}
                </Label>
                <Label color="grey">
                  <RepoForkedIcon size={13} /> {this.state.repoModal.fork_count}
                </Label>
                <Label color="grey">
                  <GitPullRequestIcon size={13} />{" "}
                  {this.state.repoModal.pr_count}
                </Label>
                <Label color="grey">
                  <EyeIcon size={13} /> {this.state.repoModal.watcher_count}
                </Label>
                <Label color="grey">
                  <PackageIcon size={13} /> {this.state.repoModal.release_count}
                </Label>
                <Label color="red">
                  <ShieldIcon size={13} />{" "}
                  {this.state.repoModal.vulnerability_count}
                </Label>
                {this.state.repoModal.tags &&
                  this.state.repoModal.tags.map((tag) => (
                    <Label
                      key={tag.name}
                      style={{
                        backgroundColor: tag.bgcolor,
                        color: tag.color,
                      }}>
                      {tag.title}
                    </Label>
                  ))}
              </Label.Group>
              <ReactQuill
                theme="snow"
                modules={editorModules}
                formats={editorFormats}
                value={this.state.repoModalNotes}
                onChange={(newNote) =>
                  this.setState({ repoModalNotes: newNote })
                }
              />
            </Modal.Content>
            <Modal.Actions>
              <Button
                onClick={() => this.setState({ openRepoModal: false })}
                icon="close"
                content="Close"
                negative
              />
              <Button
                onClick={() => {
                  fetch(
                    constants.API_BASE +
                      `github/repos/update/${this.state.repoModal.repo_id}/`,
                    {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization:
                          "Token " + localStorage[constants.STORAGE_NAME],
                      },
                      body: JSON.stringify({
                        notes: this.state.repoModalNotes,
                      }),
                    }
                  ).then((response) => console.log(response.status));
                  var temp = this.state.repoModal;
                  temp.notes = this.state.repoModalNotes;
                  set(this.state.repoModal.repo_id, temp)
                    .then(() => console.log("It worked!"))
                    .catch((err) => console.log("It failed!", err));
                  this.setState({ openRepoModal: false });
                }}
                icon="check"
                content="Save"
                positive
              />
            </Modal.Actions>
          </Modal>

          <Board
            data={this.state.board_data}
            style={{ backgroundColor: "#ae2929", height: "86vh" }}
            cardStyle={{ padding: "0.5em", width: "350px" }}
            tagStyle={{ paddingLeft: "0.5em", paddingRight: "0.5em" }}
            components={{ Card: RepoCard }}
            handleDragEnd={handleDragEnd}
            onCardClick={(cardId, metadata, laneId) => {
              get(cardId).then((val) =>
                this.setState({
                  repoModal: val,
                  openRepoModal: true,
                  repoModalNotes: val.notes,
                })
              );
            }}
            hideCardDeleteIcon
            cardDraggable
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Ideas",
      render: () => (
        <Tab.Pane>
          <div style={{ height: "86vh" }}>
            <Dimmer active inverted>
              <Loader size="massive" inverted>
                Coming Soon
              </Loader>
            </Dimmer>
          </div>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Hidden Repos",
      render: () => (
        <Tab.Pane>
          <div style={{ height: "86vh" }}>
            <Dimmer active inverted>
              <Loader size="massive" inverted>
                Coming Soon
              </Loader>
            </Dimmer>
          </div>
        </Tab.Pane>
      ),
    },
  ];

  repos(endpoint) {
    this.setState({ loading: true });
    clear();
    var temp_data = this.state.board_data;
    temp_data.lanes.forEach((lane) => (lane.cards.length = 0));
    fetch(constants.API_BASE + endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + localStorage[constants.STORAGE_NAME],
      },
    })
      .then((response) => {
        this.setState({ responseCode: response.status });
        return response.json();
      })
      .then((data) => {
        if (this.state.responseCode === 200) {
          data.forEach((repo) => {
            var card = {
              id: repo.repo_id,
              repo: repo,
              tags: [],
              laneId: laneIds[repo.status],
            };
            if (repo.language_1 != null) {
              card.tags.push({
                title: repo.language_1.name,
                color: pickTagTextColor(repo.language_1.color),
                bgcolor: repo.language_1.color,
              });
            }
            if (repo.language_2 != null) {
              card.tags.push({
                title: repo.language_2.name,
                color: pickTagTextColor(repo.language_2.color),
                bgcolor: repo.language_2.color,
              });
            }
            if (repo.language_3 != null) {
              card.tags.push({
                title: repo.language_3.name,
                color: pickTagTextColor(repo.language_3.color),
                bgcolor: repo.language_3.color,
              });
            }
            temp_data.lanes[repo.status].cards.push(card);
            repo.tags = card.tags;
            set(repo.repo_id, repo)
              .then(() => console.log("It worked!"))
              .catch((err) => console.log("It failed!", err));
          });
          this.setState({ board_data: temp_data });
          console.log(temp_data);
        }
        if (this.state.responseCode === 401) {
          localStorage.removeItem(constants.STORAGE_NAME);
          this.setState({ logged: false });
        }
        this.setState({ loading: false });
      });
  }

  componentWillMount() {
    this.repos("github/repos/");
  }

  handleLogout = () => {
    clear();
    const rappelToken = localStorage[constants.STORAGE_NAME];
    fetch(constants.API_BASE + "auth/logout/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + rappelToken,
      },
    }).then((response) => {
      if (response.status === 204) {
        localStorage.removeItem(constants.STORAGE_NAME);
        this.setState({ logged: false });
      } else {
        this.setState({ logged: true });
      }
    });
  };

  render() {
    return (
      <div className="dashboard-main">
        {verifyCreds() ? "" : <Redirect to="/" />}
        <div style={{ height: "6vh", display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            style={{ height: "75%", width: "auto", marginLeft: "1em" }}
          />
          <h2 style={{ margin: 0, marginLeft: "0.5em" }}>Rappel</h2>
          <Button
            style={{ marginLeft: "auto", marginRight: "1em" }}
            icon="refresh"
            content="Refresh Repos"
            onClick={() => {
              this.repos("github/refresh/");
            }}
            primary
          />
          <Button
            style={{ marginRight: "1em" }}
            onClick={this.handleLogout}
            content="Logout"
            primary
          />
        </div>
        <Tab menu={{ secondary: true, pointing: true }} panes={this.panes} />
        {this.state.logged ? "" : <Redirect to="/" />}
      </div>
    );
  }
}

export default Dashboard;

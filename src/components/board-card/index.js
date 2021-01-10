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
import { Card, Divider, Label } from "semantic-ui-react";
import {
  EyeIcon,
  GitPullRequestIcon,
  LockIcon,
  PackageIcon,
  RepoForkedIcon,
  ShieldIcon,
  StarIcon,
} from "@primer/octicons-react";

const RepoCard = (props) => {
  return (
    <div
      onClick={props.onClick}
      style={props.style}
      className={props.className}>
      <Card style={{ width: "100%" }}>
        <Card.Content>
          <Card.Header>
            {props.repo.name}
            {props.repo.is_fork && <RepoForkedIcon size={20} />}
            {props.repo.is_private && <LockIcon size={20} />}
          </Card.Header>
          <Card.Meta>
            {!props.repo.is_owner && "@" + props.repo.owner}
          </Card.Meta>
          <Divider />

          <div style={{ whiteSpace: "pre-wrap" }}>
            {props.repo.description || "No description available!"}
          </div>

          <Divider />

          <Label.Group
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "row",
              flexWrap: "wrap",
            }}>
            <Label
              style={{ margin: "0 .14285714em" }}
              color="black"
              basic
              horizontal>
              <StarIcon size={13} /> {props.repo.star_count}
            </Label>
            <Label
              style={{ margin: "0 .14285714em" }}
              color="black"
              basic
              horizontal>
              <RepoForkedIcon size={13} /> {props.repo.fork_count}
            </Label>
            <Label
              style={{ margin: "0 .14285714em" }}
              color="black"
              basic
              horizontal>
              <GitPullRequestIcon size={13} /> {props.repo.pr_count}
            </Label>
            <Label
              style={{ margin: "0 .14285714em" }}
              color="black"
              basic
              horizontal>
              <EyeIcon size={13} /> {props.repo.watcher_count}
            </Label>
            <Label
              style={{ margin: "0 .14285714em" }}
              color="black"
              basic
              horizontal>
              <PackageIcon size={13} /> {props.repo.release_count}
            </Label>
            <Label
              style={{ margin: "0 .14285714em" }}
              color="red"
              basic
              horizontal>
              <ShieldIcon size={13} /> {props.repo.vulnerability_count}
            </Label>
          </Label.Group>
          {props.tags && (
            <Label.Group
              style={{
                paddingTop: 6,
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
                flexWrap: "wrap",
              }}>
              {props.tags.map((tag) => (
                <Label
                  key={tag.name}
                  style={{ backgroundColor: tag.bgcolor, color: tag.color }}
                  horizontal>
                  {tag.title}
                </Label>
              ))}
            </Label.Group>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

export default RepoCard;

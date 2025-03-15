import { capitalizeFirstLetter } from "../core/utils";
import { MoveAction } from "../core/actions/MoveAction";
import { Resolver } from "../SelectActionUsingReact";
import styles from "../App.module.css";

type MovementButtonProps = {
  direction: string;
  action: MoveAction | undefined;
  resolver: Resolver;
  hidden: boolean;
};

export function MovementButton({
  direction,
  action,
  resolver,
  hidden,
}: MovementButtonProps) {
  let props: any = {
    className: `${styles.button} ${styles.directionButton} ${styles[direction]}`,
    disabled: hidden,
  };
  if (!hidden && action !== undefined) {
    props.onClick = () => resolver.resolve(action);
  } else {
    props.className += ` ${styles.disabled}`;
  }
  return <button {...props}>{capitalizeFirstLetter(direction)}</button>;
}

import {
  getAngleZ,
  visibleCoords,
  knee_position,
  getAngle,
  is_horizontal,
} from "../modules/Logics";

var state = -1;
var previous_state = -1;

export const squats = (poses, data, setter) => {
  let rb_angle = getAngleZ(poses[12], poses[24], poses[26]);
  let rk_angle = getAngleZ(poses[24], poses[26], poses[28]);
  let lb_angle = getAngleZ(poses[11], poses[23], poses[25]);
  let lk_angle = getAngleZ(poses[23], poses[25], poses[27]);

  if (
    (Math.abs(poses[0].y - poses[31].y) * 720 >= window.innerHeight * 0.5 ||
      Math.abs(poses[0].y - poses[32].y) * 720 >= window.innerHeight * 0.5) &&
    visibleCoords({ poseLandmarks: poses }) * 100 >= 80
  ) {
    if (
      lk_angle > 120 &&
      rk_angle > 120 &&
      lb_angle > 120 &&
      rb_angle > 120 &&
      knee_position(poses)
    ) {
      state = 0;
    } else if (
      rb_angle < 100 &&
      lb_angle < 100 &&
      rk_angle < 90 &&
      lk_angle < 90 &&
      knee_position(poses)
    ) {
      state = 1;
    }
    if (poses[26].visibility < 0.5) {
      if (lk_angle > 120 && lb_angle > 120) {
        state = 0;
      } else if (lk_angle < 90 && lb_angle < 100) {
        state = 1;
      } else {
        if (lk_angle > 120 && lb_angle > 120 && knee_position(poses)) {
          state = 0;
        } else if (lk_angle < 90 && lb_angle < 100 && knee_position(poses)) {
          state = 1;
        }
      }
    }
    if (poses[25].visibility < 0.5) {
      if (rk_angle > 120 && rb_angle > 120) {
        state = 0;
      } else if (rk_angle < 90 && rb_angle < 100) {
        state = 1;
      }
    } else {
      if (rk_angle > 120 && rb_angle > 120 && knee_position(poses)) {
        state = 0;
      } else if (rk_angle < 90 && rb_angle < 100 && knee_position(poses)) {
        state = 1;
      }
    }
    if ((previous_state === 1 || previous_state === 2) && state === 0) {
      data.count++;
      data.reps--;
      setter(data.reps);
      console.log(data.reps, data.count);
      // data.countTime = new Date().getSeconds();

      // callback && callback();
    }
    previous_state = state;
  }

  // if(data.complete)
  // {
  //     if((k_angle < 60))
  //     {
  //     data.complete = false
  //     data.count++
  //     data.partial = false

  //     data.energy = true

  //     data.countTime = new Date().getSeconds()

  //     // time_limit_err = true

  //     // no_guidance && hmsActions.sendBroadcastMessage(`count|${ data.count }`)

  //     // console.log('count sent')
  //     }
  // }

  // if(data.partial && (k_angle > 150 && b_angle > 150))
  // {
  //     data.partial = false
  // }
};

export const pushUps = (poses, data, setter) => {
  const angle_lk = getAngleZ(poses[23], poses[25], poses[27]);
  const angle_lh = getAngle(poses[11], poses[23], poses[25]);
  const angle_le = getAngle(poses[11], poses[13], poses[15]);
  const angle_ls = getAngleZ(poses[13], poses[11], poses[23]);
  if (is_horizontal(poses, 2)) {
    if (angle_le > 130 && angle_lh > 130 && angle_lk > 130 && angle_ls > 45) {
      state = 0;
    } else if (
      angle_le < 90 &&
      angle_lh > 130 &&
      angle_lk > 130 &&
      angle_ls > 45
    ) {
      state = 1;
    }
  }
  if (previous_state == 1 && state == 0) {
    data.count++;
    console.log(data.count);
    data.reps--;
    setter(data.reps);
  }
  previous_state = state;
};

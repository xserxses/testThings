package com.github.xserxses.testthings


import android.app.Activity
import android.media.MediaPlayer
import android.os.Bundle
import android.view.View
import android.widget.Button


class MainActivity : Activity() {

    lateinit var mp: MediaPlayer

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val one = findViewById<Button>(R.id.button1) as Button
        mp = MediaPlayer.create(this, R.raw.example)
        one.setOnClickListener {
            if (mp.isPlaying) {
                mp.stop()
            } else {
                mp.start()
            }
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        mp.release()
    }

}
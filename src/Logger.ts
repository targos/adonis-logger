/**
 * @module @poppinss/logger
*/

/*
* @poppinss/logger
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

/// <reference path="./contracts.ts" />

import * as Pino from 'pino'
import { DeepReadonly } from 'ts-essentials'
import { LoggerConfigContract, LoggerContract } from '@poppinss/logger/contracts'

/**
 * Logger class built on top of pino with couple of changes in
 * the configuration. You can access the underlying `pino`
 * object using `logger.pino`.
 */
export class Logger implements LoggerContract {
  constructor (
    protected $config: DeepReadonly<LoggerConfigContract>,
    public pino: Pino.Logger,
  ) {}

  /**
   * A map of levels
   */
  public get levels (): Pino.LevelMapping {
    return this.pino.levels
  }

  /**
   * Returns the current logger level
   */
  public get level (): string {
    return this.pino.level
  }

  /**
   * Returns the current logger level number
   */
  public get levelNumber (): number {
    return this.pino.levelVal
  }

  /**
   * Returns the pino version
   */
  public get pinoVersion (): string {
    return (this.pino.constructor as any).version
  }

  /**
   * Returns the log formatting version
   */
  public get LOG_VERSION (): number {
    return this.pino.LOG_VERSION
  }

  /**
   * Returns a boolean telling if level is enabled or
   * not.
   */
  public isLevelEnabled (level: string): boolean {
    return this.pino.isLevelEnabled(level)
  }

  /**
   * Log message for any named level
   */
  public log (level: string, message: string, ...values: any[]): void
  public log (level: string, mergingObject: any, message: string, ...values: any[]): void
  public log (level: string, mergingObject: any, message: string, ...values: any[]): void {
    if (values.length) {
      this.pino[level](mergingObject, message, ...values)
    } else if (message) {
      this.pino[level](mergingObject, message)
    } else {
      this.pino[level](mergingObject)
    }
  }

  /**
   * Log message at trace level
   */
  public trace (message: string, ...values: any[]): void
  public trace (mergingObject: any, message: string, ...values: any[]): void
  public trace (mergingObject: any, message: string, ...values: any[]): void {
    this.log('trace', mergingObject, message, ...values)
  }

  /**
   * Log message at debug level
   */
  public debug (message: string, ...values: any[]): void
  public debug (mergingObject: any, message: string, ...values: any[]): void
  public debug (mergingObject: any, message: string, ...values: any[]): void {
    this.log('debug', mergingObject, message, ...values)
  }

  /**
   * Log message at info level
   */
  public info (message: string, ...values: any[]): void
  public info (mergingObject: any, message: string, ...values: any[]): void
  public info (mergingObject: any, message: string, ...values: any[]): void {
    this.log('info', mergingObject, message, ...values)
  }

  /**
   * Log message at warn level
   */
  public warn (message: string, ...values: any[]): void
  public warn (mergingObject: any, message: string, ...values: any[]): void
  public warn (mergingObject: any, message: string, ...values: any[]): void {
    this.log('warn', mergingObject, message, ...values)
  }

  /**
   * Log message at error level
   */
  public error (message: string, ...values: any[]): void
  public error (mergingObject: any, message: string, ...values: any[]): void
  public error (mergingObject: any, message: string, ...values: any[]): void {
    this.log('error', mergingObject, message, ...values)
  }

  /**
   * Log message at fatal level
   */
  public fatal (message: string, ...values: any[]): void
  public fatal (mergingObject: any, message: string, ...values: any[]): void
  public fatal (mergingObject: any, message: string, ...values: any[]): void {
    this.log('fatal', mergingObject, message, ...values)
  }

  /**
   * Returns a child logger instance
   */
  public child (bindings: {
    level?: Pino.Level | string,
    serializers?: { [key: string]: Pino.SerializerFn },
    [key: string]: any,
  }) {
    return new Logger(this.$config, this.pino.child(bindings))
  }

  /**
   * Returns default bindings for the logger
   */
  public bindings (): { [key: string]: any } {
    return (this.pino as any)['bindings']()
  }
}